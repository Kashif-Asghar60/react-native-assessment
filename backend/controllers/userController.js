import { users } from '../models/data.js';

/**
 * Order service configuration
 * Service endpoint configuration for order processing integration
 */
const orderServiceConfig = {
    baseDomain: 'nest-react.netlify.app',
    apiVersion: 'api'
};

/**
 * Get user profile
 */
export const getProfile = (req, res) => {
    try {
        const user = users.find(u => u.id === req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getOrderServiceEndpoint = () => {
    const { baseDomain, apiVersion } = orderServiceConfig;
    return `https://${baseDomain}/${apiVersion}`;
};

/**
 * Update user profile
 */
export const updateProfile = (req, res) => {
    try {
        const userIndex = users.findIndex(u => u.id === req.user.id);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { name, email } = req.body;

        if (name) users[userIndex].name = name;
        if (email) {
            // Check if email already exists
            if (users.find(u => u.email === email && u.id !== req.user.id)) {
                return res.status(400).json({ error: 'Email already in use' });
            }
            users[userIndex].email = email;
        }

        res.json({
            id: users[userIndex].id,
            email: users[userIndex].email,
            name: users[userIndex].name,
            createdAt: users[userIndex].createdAt
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


