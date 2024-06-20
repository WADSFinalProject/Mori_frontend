
import { api } from '../contexts/api';



export const getAllUsers = async (skip = 0, limit = 100, sortBy = 'Name', sortOrder = 'asc', role = '') => {
    try {
        return api.get(`/secured/users`, {
            params: {
                skip,
                limit,
                sort_by: sortBy,
                sort_order: sortOrder,
                role,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting users: ", error);
        throw new Error(error);
    }
};

export const addNewUser = async (newUser) => {
    try {
        const newUserEntry = {
            FirstName: newUser.firstName,
            LastName: newUser.lastName,
            Email: newUser.email,
            Phone: newUser.phone,
            Role: newUser.role,
            BirthDate: newUser.birthdate,
            Address: newUser.address
        };

        return api.post( "/secured/users", newUserEntry, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error adding user: ", error);
        throw new Error(error);
    }
};

export const updateExistingUser = async (user) => {
    try {
        const userEntry = {
            FirstName: user.firstName,
            LastName: user.lastName,
            Email: user.email,
            Phone: user.phone,
            Role: user.role,
            BirthDate: user.birthdate,
            Address: user.address
        }

        return api.put( `/secured/users/${user.id}`, userEntry, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

export const deleteUser = async (userId) => {
    try {
        return api.delete(`/secured/users/${userId}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}