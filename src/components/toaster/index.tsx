import './style.scss'
import toast, { ToastBar, Toaster } from 'react-hot-toast';

import { CloseIcon } from '../icons';

const AppToaster = () => {
  return (
    <Toaster
      position='bottom-center'
      toastOptions={{
        duration: 10000,
      }}
    >
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            borderRadius: '30px',
            padding: '10px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#333333',
          }}
        >
          {({ message }) => (
            <>
              <div className="snackbar__text">{message}</div>
              {t.type !== 'loading' && (
                <button type="button" className="snackbar__close" onClick={() => toast.dismiss(t.id)}>
                  <CloseIcon className="snackbar__icon" />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  )
}

export default AppToaster;
