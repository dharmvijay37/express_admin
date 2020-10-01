$(() => {
    $('#editPermissionForm,#createPermissionForm').validate({
      rules: {
        name: {
          required: true,
        },
        status: {
          required: true,
        },
      },
      messages: {
        name: {
          required: 'NAME is required!',
        },
        status: {
          required: 'STATUS is required!',
        }
      },
      errorElement: 'span',
      errorLabelContainer: '.error',
      submitHandler: (form) => {
        form.submit();
      }
    });
  });
  