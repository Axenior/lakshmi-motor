export default function Container({ className = "", children, ...props }) {
    return (
        <div
            {...props}
            className={"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 " + className}
        >
            {children}
        </div>
    );
}
