import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({ className, selected, handleChange, labelText }) => {
    return (
        <div className="form-row">
            <label className="form-label">{labelText}</label>
            <DatePicker
                className="form-input"
                selected={selected}
                onChange={handleChange}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={new Date()}
                required
            />
        </div>
    );
};

export default DateInput;
