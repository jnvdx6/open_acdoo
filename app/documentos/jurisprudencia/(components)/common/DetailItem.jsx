export const DetailItem = ({ icon: Icon, label, value, className = "" }) => (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        <span className="text-muted-foreground">{label}:</span>
        <span className="font-medium">{value}</span>
    </div>
);