const quantityValidatorMessages = {
    notNull: '"quantity" is required',
    largerThanOne: '"quantity" must be a number larger than or equal to 1',
};

const quantityValidator = async (req, res, next) => {
    const { quantity } = req.body;
    const { notNull, largerThanOne } = quantityValidatorMessages;

    if (quantity === undefined) {
        return res.status(400).json({ message: notNull });
    } 

    if (quantity <= 0 || typeof quantity !== 'number') {
        return res.status(422).json({ message: largerThanOne });
    }

    next();
};

module.exports = quantityValidator;