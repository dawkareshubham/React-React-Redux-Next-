import { useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';


export default function ResultModal({ ref, remainingTime, targetTime, onReset }) {
  const dialog = useRef();
  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal();
    }
  }));

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  return createPortal(
    <dialog className='result-modal' ref={dialog} onClose={onReset}>
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>The target time was <strong>{targetTime} second{targetTime > 1 ? 's' : ''}.</strong></p>
      <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left</strong></p>
      <form method='dialog' onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  )
}
 
// before react 19 , ref cannot be passed as a prop
// need to use forwardRef
// import React from 'react'

// const ResultModal = React.forwardRef(function ResultModal({ result, targetTime }, ref) {
//   return (
//     <dialog className='result-modal' ref={ref}>
//       <h2>You {result}</h2>
//       <p>The target time was <strong>{targetTime} second{targetTime > 1 ? 's' : ''}.</strong></p>
//       <p>You stopped the timer with <strong>X seconds left</strong></p>
//       <form method='dialog'>
//         <button>Close</button>
//       </form>
//     </dialog>
//   )
// }

// export default ResultModal;