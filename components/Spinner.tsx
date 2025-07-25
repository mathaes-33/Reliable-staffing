
import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div
            className={`animate-spin rounded-full border-4 border-slate-200 border-t-primary ${sizeClasses[size]}`}
            role="status"
            aria-label="Loading..."
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Spinner;
