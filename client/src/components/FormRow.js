const FormRow = ({
    className,
    type,
    min,
    name,
    value,
    handleChange,
    labelText,
    subText,
}) => {
    return (
        <div className={className + " form-row"}>
            {labelText && (
                <label htmlFor={name} className="form-label">
                    {labelText}
                </label>
            )}
            <input
                type={type}
                min={min}
                value={value}
                name={name}
                onChange={handleChange}
                className="form-input"
                required
            />
            {subText && <small htmlFor={name}>{subText}</small>}
        </div>
    );
};

export default FormRow;
