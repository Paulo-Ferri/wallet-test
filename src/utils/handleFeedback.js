import toast from 'react-hot-toast';

const handleFeedback = (message, type) => {
  switch (type) {
    case 'error':
      return toast.error(message, {
        duration: 3000
      })
      default:
        return toast.success(message, {
        duration: 3000
      })
  }
}

export default handleFeedback;