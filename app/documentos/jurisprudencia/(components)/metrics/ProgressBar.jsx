export const ProgressBar = ({ value, label }) => (
    <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span>{value}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
            <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${value}%` }}
            />
        </div>
    </div>
);