const Button = ({ children, variant = 'primary', onClick }) => {
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200',
      danger: 'bg-red-600 hover:bg-red-700 text-white'
    };

    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full font-medium transition-colors ${variants[variant]}`}
      >
        {children}
      </button>
    );
  };

  export default Button;