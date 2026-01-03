# Project Design Rules

## Input Fields & Forms
All form inputs (TextField, etc.) must follow this strict structure to maintain consistency across the application (e.g., Contact Form, Login Form):

### 1. Structure
*   **No Floating Labels**: Do not use the default Material UI floating `label` prop on the `TextField`.
*   **External Label**: Use a standalone `Typography` component above the input field.
    *   Variant: `subtitle2`
    *   Style: `fontWeight: 'bold'`, `mb: 1`, `ml: 1`
*   **Placeholder**: Use the `placeholder` prop within the `TextField` to guide the user.

### 2. Visual Styling
The `TextField` `sx` prop must apply the following styles:
```javascript
sx={{
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        bgcolor: 'white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        '& fieldset': { borderColor: '#e0e0e0' },
        '&:hover fieldset': { borderColor: 'primary.main' },
    }
}}
```

### 3. Validation State
*   **Error Reset**: When a form is submitted successfully, clear the form *and* reset the validation state (e.g., `touched`).
*   **Error Display**: Only show error helper text if the field has been touched AND has a value (if checking format) or is required and empty (if checking presence). Avoid showing errors on "fresh" empty fields after a reset.
