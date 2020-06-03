const [isOnline, setIsOnline] = React.useState(navigator.onLine);
React.useEffect(() => {
  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}, []);

// <h5>Network status: {isOnline ? 'online' : 'offline'}</h5>
