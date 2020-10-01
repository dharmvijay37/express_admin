$(() => {
  $('#editCountryForm').validate({
    rules: {
      name: {
        required: true,
      },
      nationality: {
        required: true
      },
      isoCode: {
        required: true
      }
    },
    messages: {
      name: {
        required: 'COUNTRY NAME is required!',
      },
      nationality: {
        required: 'COUNTRY NATIONALITY is required!',
      },
      isoCode: {
        required: 'COUNTRY ISO CODE is required!',
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: (form) => {
      form.submit();
    }
  });
});
