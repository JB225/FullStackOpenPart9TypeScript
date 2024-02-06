const ErrorNotification = ({message} : {message : string}) => {
  const style = {
    color: 'red'
  };

  if (message) {
    return (
      <div>
        <p style={style}>{message}</p>
      </div>
    );
  }
};

export default ErrorNotification;