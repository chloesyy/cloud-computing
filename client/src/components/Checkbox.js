const Checkbox = ({ label, value, onChange }) => {
    return (
        <label>
            <input
                className="form-checkbox"
                type="checkbox"
                checked={value}
                onChange={onChange}
            />
            {label}
        </label>
    );
};

export default Checkbox;
