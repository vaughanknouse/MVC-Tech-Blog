// Export an object with a function to format dates
module.exports = {
  // Function to format a date using toLocaleDateString
  format_date: (date) => {
      // Use toLocaleDateString to format the date in a locale-sensitive manner (MM/DD/YYYY)
      return date.toLocaleDateString();
  },
};
