import { AuthorizationData } from '@entities/user';
import { useForm } from '@shared/hooks/use-form';
import { useValidate, ValidationConfig } from '@shared/hooks/use-validation';
import classNames from 'classnames';

type LoginFormProps = {
  onSubmit: (data: AuthorizationData) => Promise<void>;
}

const initialFormValue: AuthorizationData = {
  email: '',
  password: ''
};

const validationSchema: ValidationConfig<AuthorizationData> = {
  email: [
    {
      // eslint-disable-next-line
      rule: (value) => /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value),
      errorMessage: 'Email is not correct!'
    },
  ],
  password: [
    {
      rule: (value) => /([a-zA-Z]\d){1}|(\d[a-zA-Z]){1}/gm.test(value),
      errorMessage: 'Password is not correct'
    }
  ]
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    handleSubmit,
    setFieldValue,
    getFieldValue,
    getFormValues,
    reset,
    isSubmitting,
  } = useForm<AuthorizationData>(initialFormValue);
  const {
    validateField,
    resetValidation,
    validateAll,
    validationResult
  } = useValidate(validationSchema);

  const formSubmitHandler = (data: AuthorizationData) => {
    validateAll(getFormValues());

    if (validationResult.isValid) {
      onSubmit(data);
      resetValidation();
      reset();
    }
  };

  const inputChangeHandler = <TKey extends keyof AuthorizationData>(value: AuthorizationData[TKey], inputName: TKey) => {
    validateField(value, inputName);
    setFieldValue(inputName, value);
  };

  const emailInputClassName = classNames(
    'login__input form__input',
    {
      'error': validationResult.validations?.email?.isNotValid
    }
  );

  const passwordInputClassName = classNames(
    'login__input form__input',
    {
      'error': validationResult.validations?.password?.isNotValid
    }
  );

  return (
    <form className='login__form form' action='#' method='post' onSubmit={handleSubmit(formSubmitHandler)}>
      <div className='login__input-wrapper form__input-wrapper'>
        <label className='visually-hidden'>E-mail</label>
        <input
          className={emailInputClassName}
          type='email'
          name='email'
          placeholder='Email'
          required
          value={getFieldValue('email')}
          onChange={(event) => inputChangeHandler(event.target.value, 'email')}
        />
        {validationResult.validations?.email?.isNotValid && <span className=''></span>}
      </div>
      {validationResult.validations?.email?.isNotValid && <small className='error-message'>{validationResult.validations.email?.message}</small>}
      <div className='login__input-wrapper form__input-wrapper'>
        <label className='visually-hidden'>Password</label>
        <input
          className={passwordInputClassName}
          type='password'
          name='password'
          placeholder='Password'
          required
          value={getFieldValue('password')}
          onChange={(event) => inputChangeHandler(event.target.value, 'password')}
        />
      </div>
      {validationResult.validations?.password?.isNotValid && <small className='error-message'>{validationResult.validations.password?.message}</small>}
      <button className='login__submit form__submit button' type='submit' disabled={!validationResult.isValid && !isSubmitting}>Sign in</button>
    </form>
  );
}
