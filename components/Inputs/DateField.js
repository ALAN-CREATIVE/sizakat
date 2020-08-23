import React from 'react';
import { InputStyle } from './InputStyle';
import { Select } from './Dropdown';

const DATE = Array(31).fill().map((value, index) => index + 1);
const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const DateField = ({
    label,
    required,
    onDatePicked,
    onMonthPicked,
    onYearPicked,
    errorDate,
    errorMonth,
    errorYear,
    isOpen
}) => {
  const YEARS = Array(new Date().getFullYear() - 1940).fill().map((value, index) => index + 1940).reverse();
  return (
    <div>
      <InputStyle />
      <label className={required ? 'required': ''}>{ label }</label>
      <div class="row">
        <div class="col-12 col-sm-4">
          <Select
            placeholder={'Tanggal'}
            options={DATE.map(date => ({ display: date, value: String(date).padStart(2, "0") }))}
            onSelect={onDatePicked}
            isOpen={isOpen}
          />
          { errorDate && <span className="error">{ errorDate }</span> }
        </div>
        <div class="col-12 col-sm-4">
          <Select
            placeholder={'Bulan'}
            options={MONTHS.map((month, index) => ({ display: month, value: String(index+1).padStart(2, "0") }))}
            onSelect={onMonthPicked}
            isOpen={isOpen}
          />
          { errorMonth && <span className="error">{ errorMonth }</span> }
        </div>
        <div class="col-12 col-sm-4">
          <Select
            placeholder={'Tahun'}
            options={YEARS.map(year => ({ display: year, value: String(year) }))}
            onSelect={onYearPicked}
            isOpen={isOpen}
          />
          { errorYear && <span className="error">{ errorYear }</span> }
        </div>
      </div>
    </div>
  )
}

export default DateField;
