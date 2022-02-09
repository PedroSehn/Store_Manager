const nameValidatorMessages = {
    notNull: '"name" is required',
    atLeastFive: '"name" length must be at least 5 characters long',
    productDontExists: 'Product does not exists',
};

const nameValidator = (req, res, next) => {
    const { name } = req.body;
    const { notNull, atLeastFive } = nameValidatorMessages;
    if (!name) return res.status(400).json({ message: notNull });
    if (name.length < 5) return res.status(422).json({ message: atLeastFive });

    next();
};

module.exports = {
    nameValidator,
};