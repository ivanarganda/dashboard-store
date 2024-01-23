import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';

export const useDate = (date = '') => {
  const [formattedDate, setFormattedDate] = useState('');
  const now = moment();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedDate(currentDate());
    }, 500);

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

  const currentDate = () => {
    return now.format('dddd, DD MMM YYYY HH:mm:ss');
  };

  const formatDate = () => {
    return moment(formattedDate, 'dddd, DD MMM YYYY HH:mm:ss').format('DD-MM-YYYY');
  };

  return [currentDate(), formatDate()];
};
