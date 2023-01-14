import { Form } from "react-bootstrap";

const AddPetFormBodyTemplate = ({
    isEditing,
    handleChange,
    type,
    breed,
    name,
    status,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietRestrict,
}) => {
    return (
        <>
            <Form.Group>
                <label className="mt-2 mb-1">Pet Type</label>
                <div>
                    <Form.Check
                        inline
                        type="radio"
                        id="dog"
                        name="type"
                        label="Dog"
                        checked={type === "dog" ? true : false}
                        onChange={handleChange}
                        required
                    />
                    <Form.Check
                        inline
                        type="radio"
                        id="cat"
                        name="type"
                        label="Cat"
                        checked={type === "cat" ? true : false}
                        onChange={handleChange}
                        required
                    />
                </div>
            </Form.Group>
            <label htmlFor="breed" className="mt-2 mb-1">
                Breed
            </label>
            <Form.Control
                type="text"
                id="breed"
                value={breed}
                onChange={handleChange}
            />
            <label htmlFor="name" className="mt-2 mb-1">
                Name
            </label>
            <Form.Control
                type="text"
                id="name"
                value={name}
                onChange={handleChange}
                required
            />
            <label htmlFor="status" className="mt-2 mb-1">
                Status
            </label>
            <Form.Select
                id="status"
                value={status}
                onChange={handleChange}
                required
            >
                <option value="" defaultChecked>
                    Select
                </option>
                <option value="available">Available</option>
                <option value="fostered">Fostered</option>
                <option value="adopted">Adopted</option>
            </Form.Select>
            <label htmlFor="photo" className="mt-2 mb-1">
                Photo
            </label>
            <Form.Control
                type="file"
                accept="image/*"
                id="photo"
                onChange={handleChange}
                required={isEditing ? false : true}
            />
            <Form.Group className="d-flex">
                <div className="me-4">
                    <label htmlFor="height" className="mt-2 mb-1">
                        Height (cm)
                    </label>
                    <Form.Control
                        type="number"
                        id="height"
                        min="0"
                        max="999"
                        value={height}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="weight" className="mt-2 mb-1">
                        Weight (kg)
                    </label>
                    <Form.Control
                        type="number"
                        id="weight"
                        min="0"
                        max="999"
                        value={weight}
                        onChange={handleChange}
                        required
                    />
                </div>
            </Form.Group>
            <label htmlFor="color" className="mt-2 mb-1">
                Color
            </label>
            <Form.Control
                type="text"
                id="color"
                value={color}
                onChange={handleChange}
                required
            />
            <label htmlFor="bio" className="mt-2 mb-1">
                Bio
            </label>
            <Form.Control
                as="textarea"
                id="bio"
                value={bio}
                rows={4}
                onChange={handleChange}
            />
            <Form.Group>
                <label className="mt-2 mb-1">Hypoallergenic</label>
                <div>
                    <Form.Check
                        inline
                        type="radio"
                        id="hypoallergenic-yes"
                        name="hypoallergenic"
                        label="Yes"
                        checked={hypoallergenic === "" ? false : hypoallergenic}
                        onChange={handleChange}
                        required
                    />
                    <Form.Check
                        inline
                        type="radio"
                        id="hypoallergenic-no"
                        name="hypoallergenic"
                        label="No"
                        checked={
                            hypoallergenic === "" ? false : !hypoallergenic
                        }
                        onChange={handleChange}
                        required
                    />
                </div>
            </Form.Group>
            <label htmlFor="dietRestrict" className="mt-2 mb-1">
                Dietary Restrictions
            </label>
            <Form.Control
                type="text"
                id="dietRestrict"
                value={dietRestrict}
                onChange={handleChange}
                className="mb-2"
            />
        </>
    );
};

export default AddPetFormBodyTemplate;
