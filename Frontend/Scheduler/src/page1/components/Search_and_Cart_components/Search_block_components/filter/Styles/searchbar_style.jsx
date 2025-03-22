export const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ffffff" : "#ffffff", // Light background, white for focused
      borderColor: state.isFocused ? "#2563eb" : "#d1d5db", // Blue for focused, gray for non-focused
      color: "#000",
      borderWidth: "0.1rem",
      boxShadow: state.isFocused ? "0 0 0 0.1rem #2563eb" : "none", // Blue border on focus
      "&:hover": {
        borderColor: "#2563eb", // Blue on hover
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff", // White background for the dropdown menu
      borderRadius: "0.1rem",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Shadow effect
      color: "#000"

    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#ffffff" : "#ffffff", // Blue background for selected, white for unselected
      color: state.isSelected ? "#000" : "#000", // White text for selected, black for unselected
      borderBottom: "0.1rem solid #000", // Applying the 1 rem black border below
      borderRadius: "0.3rem",
      textAlign: "left",
      padding: "0.5rem 1rem",
      "&:hover": {
        backgroundColor: "#c3c3c3", // Light gray on hover
        color: "#000", // Black text on hover
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000", // Black text for selected value
    }),
  };
  

