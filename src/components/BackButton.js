export default function BackButton({ onClick }) {
    
    return (
    <div className="px-6 py-4">
        <button onClick={onClick}>&larr; BACK</button>
    </div>)
}