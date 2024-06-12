const { Blog } = require('../models');

exports.addBlog = async (req, res) => {
    try {
        const { title, description} = req.body;
        const userId = req.userId; 
        const image = req.file ? req.file.filename : null;

        const blog = await Blog.create({
            title,
            description,
            image,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json(blog);
    } catch (error) {
        console.error('Error adding blog:', error);
        res.status(500).json({ error: 'Error adding blog' });
    }
};


exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getBlogsByUser = async (req, res) => {
    try {
        const userId = req.userId;
        const blogs = await Blog.findAll({ where: { userId } });
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs by user:', error);
        res.status(500).json({ error: 'Error fetching blogs by user' });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByPk(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        await blog.destroy();
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: 'Error deleting blog' });
    }
};


exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByPk(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        const { title, description } = req.body;

        blog.title = title;
        blog.description = description;

        if (req.file) {
            blog.image = req.file.filename;
        }

        await blog.save();
        res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ error: 'Error updating blog' });
    }
};


exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByPk(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error('Error fetching blog by id:', error);
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
