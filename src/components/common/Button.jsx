const Button = ({ children, variant = 'primary', size = 'md', className = '', onClick, ...props }) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantClasses = {
      primary: 'bg-primary hover:bg-red-700 focus:ring-red-500 text-white',
      secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white',
      outlined: 'border border-white hover:bg-white/10 text-white',
      ghost: 'bg-black/50 hover:bg-black/70 text-white',
      transparent: 'bg-transparent hover:bg-white/10 text-white',
    };
    
    const sizeClasses = {
      sm: 'text-sm px-3 py-1.5 rounded',
      md: 'text-base px-4 py-2 rounded-md',
      lg: 'text-lg px-6 py-3 rounded-md',
    };
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    
    return (
      <button className={classes} onClick={onClick} {...props}>
        {children}
      </button>
    );
  };
  
  export default Button;