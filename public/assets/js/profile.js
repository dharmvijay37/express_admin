$(() => {
  $('#changePasswordForm').validate({
    rules: {
      password: {
        password: true,
        required: true,
      },
      retypePassword: {
        password: true,
        required: true,
        equalTo: '#password',
      },
    },
    messages: {
      password: {
        required: 'PASSWORD is required!',
      },
      retypePassword: {
        required: 'Retry PASSWORD is required!',
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: (form) => {
      form.submit();
    }
  });
  $('#editProfileForm').validate({
    rules: {
      username: {
        required: true,
      },
      email: {
        required: true,
        email: true
      },
    },
    messages: {
      username: {
        required: 'USERNAME is required!',
      },
      email: {
        required: 'EMAIL is required!',
        email: 'Please enter valid EMAIL address!'
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: (form) => {
      form.submit();
    }
  });
});
