import * as yup from 'yup';

const validate = async ({ shape, state }) => {
  const schema = yup.object().shape(shape);

  const validated = await schema.validate(state);
  return validated;
};

export default validate;
