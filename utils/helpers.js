// Export an object with a function to format dates
/*module.exports = {
  // Function to format a date using toLocaleDateString
  format_date: (date) => {
    // Check if the date argument is a valid Date object
    if (date instanceof Date && !isNaN(date)) {
      // Format the date in a locale-sensitive manner (MM/DD/YYYY)
      return date.toLocaleDateString();
    } else {
      // Return a fallback message if the date is invalid
      console.warn('Invalid date provided:', date);
      return 'Invalid date';
    }
  },
};*/

// format date mm/dd/yyy
module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
};
