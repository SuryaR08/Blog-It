const { Property } = require('../models');

exports.addProperty = async (req, res) => {
    try {
        const { title, description, location, price } = req.body;
        const userId = req.userId; // The authenticated user's ID
        const image = req.file ? req.file.filename : null;

        const property = await Property.create({
            title,
            description,
            location,
            price,
            image,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json(property);
    } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).json({ error: 'Error adding property' });
    }
};


exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.findAll();
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getPropertiesByUser = async (req, res) => {
    try {
        const userId = req.userId; // The authenticated user's ID
        const properties = await Property.findAll({ where: { userId } });
        res.status(200).json(properties);
    } catch (error) {
        console.error('Error fetching properties by user:', error);
        res.status(500).json({ error: 'Error fetching properties by user' });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findByPk(id);

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        await property.destroy();
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ error: 'Error deleting property' });
    }
};


exports.updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findByPk(id);

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        const { title, description, location, price } = req.body;

        property.title = title;
        property.description = description;
        property.location = location;
        property.price = price;

        if (req.file) {
            property.image = req.file.filename;
        }

        await property.save();
        res.status(200).json({ message: 'Property updated successfully' });
    } catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({ error: 'Error updating property' });
    }
};


exports.getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findByPk(id);

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.status(200).json(property);
    } catch (error) {
        console.error('Error fetching property by id:', error);
        res.status(500).json({ error: 'Error fetching property by id' });
    }
};


exports.rentProperty = async (req, res) => {
    const { propertyId } = req.params;
    const { paymentMethod, amount } = req.body;
    const userId = req.userId; // Extracted from the token in the middleware

    try {
        // Create a new entry in the RentedProperty table
        const rentedProperty = await RentedProperty.create({
            userId,
            propertyId,
            paymentMethod,
            amount,
        });

        res.status(200).json({ message: 'Property rented successfully', rentedProperty });
    } catch (error) {
        console.error('Error renting property:', error);
        res.status(500).json({ error: 'Error renting property' });
    }
};
