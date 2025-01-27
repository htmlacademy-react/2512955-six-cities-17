import { act, renderHook } from '@testing-library/react';
import { useForm } from '../use-form';
import faker from 'faker';
import { SyntheticEvent } from 'react';

type FakeFormValues = {
  login: string;
  password: string;
}

const FORM_VALUES: FakeFormValues = {
  login: faker.internet.email(),
  password: faker.internet.password()
};

describe('Hook \'useForm\'', () => {
  const onSubmitMock = vi.fn<[FakeFormValues], void>();

  beforeEach(() => {
    onSubmitMock.mockReset();
  });

  it('should return correct signature', () => {
    const funtionType = 'function';
    const { result } = renderHook(() => useForm(FORM_VALUES));
    const {
      getFieldValue,
      getFormValues,
      handleSubmit,
      isSubmitting,
      reset,
      setFieldValue
    } = result.current;

    expect(typeof getFieldValue).toBe(funtionType);
    expect(typeof getFormValues).toBe(funtionType);
    expect(typeof handleSubmit).toBe(funtionType);
    expect(typeof reset).toBe(funtionType);
    expect(typeof setFieldValue).toBe(funtionType);
    expect(typeof isSubmitting).toBe('boolean');
  });

  it('should correct works by \'handleSubmit\' method', async () => {
    const { result } = renderHook(() => useForm(FORM_VALUES));
    const {
      handleSubmit,
    } = result.current;

    await act(async () => {
      await handleSubmit(onSubmitMock)({
        preventDefault: vi.fn(),
        persist: vi.fn(),
      } as unknown as SyntheticEvent);
    });

    expect(onSubmitMock.mock.lastCall).toEqual([FORM_VALUES]);
  });

  it('should correct works by \'getFieldValue\' method', () => {
    const fieldName: keyof FakeFormValues = 'login';
    const { result } = renderHook(() => useForm(FORM_VALUES));
    const { getFieldValue } = result.current;

    expect(getFieldValue(fieldName)).toBe(FORM_VALUES.login);
  });

  it('should correct works by \'setFieldValue\' method', () => {
    const fieldName: keyof FakeFormValues = 'login';
    const newFieldValue = faker.internet.email();
    const { result } = renderHook(() => useForm(FORM_VALUES));
    const { setFieldValue } = result.current;

    act(() => setFieldValue(fieldName, newFieldValue));
    const { getFieldValue } = result.current;

    expect(getFieldValue(fieldName)).toBe(newFieldValue);
  });

  it('should correct works by \'getFormValues\' method', () => {
    const { result } = renderHook(() => useForm(FORM_VALUES));
    const { getFormValues } = result.current;

    expect(getFormValues()).toBe(FORM_VALUES);
  });

  it('should correct works by \'reset\' method', () => {
    const fieldName: keyof FakeFormValues = 'login';
    const newFieldValue = faker.internet.email();
    const newValues: FakeFormValues = {
      login: newFieldValue,
      password: FORM_VALUES.password
    };
    const { result } = renderHook(() => useForm(FORM_VALUES));
    const { setFieldValue } = result.current;

    act(() => setFieldValue(fieldName, newFieldValue));
    const { getFormValues, reset } = result.current;
    act(() => reset());
    const { getFormValues: getLastValues } = result.current;

    expect(getFormValues()).toEqual(newValues);
    expect(getLastValues()).toEqual(FORM_VALUES);
  });
});
