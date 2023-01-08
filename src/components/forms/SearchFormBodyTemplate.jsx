import { Form } from "react-bootstrap";

const SearchFormBodyTemplate = ({
    isAdvancedSearch,
    handleChange,
    type,
    status,
    name,
    height,
    weight,
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
                        value="dog"
                        checked={type === "dog" ? true : false}
                        onChange={handleChange}
                    />
                    <Form.Check
                        inline
                        type="radio"
                        id="cat"
                        name="type"
                        label="Cat"
                        value="cat"
                        checked={type === "cat" ? true : false}
                        onChange={handleChange}
                    />
                </div>
            </Form.Group>
            {isAdvancedSearch && (
                <>
                    <label htmlFor="status" className="mt-2 mb-1">
                        Status
                    </label>
                    <Form.Select
                        id="status"
                        value={status}
                        onChange={handleChange}
                    >
                        <option value="" defaultChecked>
                            Select
                        </option>
                        <option value="available">Available</option>
                        <option value="fostered">Fostered</option>
                        <option value="adopted">Adopted</option>
                    </Form.Select>
                    <label htmlFor="name" className="mt-2 mb-1">
                        Name
                    </label>
                    <Form.Control
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleChange}
                    />
                    <Form.Group className="d-flex mb-2">
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
                            />
                        </div>
                    </Form.Group>
                </>
            )}
        </>
    );
};

export default SearchFormBodyTemplate;
