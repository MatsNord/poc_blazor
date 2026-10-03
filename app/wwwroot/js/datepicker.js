// Minimal JS interop for DatePicker.razor.
// Only used for what Blazor cannot do without a browser API: moving focus to a
// specific calendar day cell after the grid re-renders (arrow-key navigation
// and month changes replace the DOM elements, so server-side ElementReference
// handles go stale). Everything else (state, events, rendering) is C#.
window.datePickerFocus = function (id) {
    var el = document.getElementById(id);
    if (el) {
        el.focus();
    }
};
