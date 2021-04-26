const Joi = require('joi');


const validateBook = (book) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(512),
    genre: Joi.string().required().min(3).max(255),
    author: Joi.string().required().min(3).max(255),
    year: Joi.number().required().min(1).max(new Date().getFullYear()),
    rating: Joi.number().min(1).max(5).optional().default(1)
  });
  return schema.validate(book);
}


module.exports.validateBook = validateBook;