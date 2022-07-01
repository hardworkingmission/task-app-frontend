import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const NewCalendar = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className="w-5/6 mx-auto my-5 ">
      <h1 className="text-blue-400 text-3xl font-[700] my-5">Calendar</h1>
      <div className="flex justify-center">
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  );
};

export default NewCalendar;
