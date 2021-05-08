import React from 'react'
import { Select } from 'antd'
import { Newslugify } from '../../functions/helper'
const { Option } = Select


const ProductUpdateForm = ({
    setValues,
    handleChange,
    handleSubmit,
    values,
    handleCategoryChange,
    categories,
    subOption,
    setSub,
    itemOption,
    setItem

}) => {


    const { title,
        description,
        price,
        category,
        details,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        item,
        brand } = values

    return (
        <form onSubmit={handleSubmit}>

            <div className="form-groups">
                <label className="text-primary" >Title</label>
                <input type="text"
                    style={{ border: "2px solid green" }}
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                />

            </div>
            <div className="form-groups">
                <label className="text-primary">Description</label>
                <input type="text"
                    style={{ border: "2px solid green" }}

                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                />

            </div>
            <div className="form-groups">
                <label className="text-primary">Details</label>
                <input type="text"
                    style={{ border: "2px solid green" }}

                    name="details"
                    className="form-control"
                    value={details}
                    onChange={handleChange}
                />

            </div>
            <div className="form-groups">
                <label className="text-primary">Price</label>
                <input type="number"
                    style={{ border: "2px solid green" }}

                    name="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange}
                />
            </div>
            <div className="form-groups">
                <label className="text-primary">Shipping</label>
                <select name="shipping"
                    style={{ border: "2px solid green" }}

                    value={shipping}
                    className="form-control"
                    onChange={handleChange}
                >

                    <option value="No">NO</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>
            <div className="form-groups">
                <label className="text-primary">Quantity</label>
                <input type="number"
                    style={{ border: "2px solid green" }}

                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}
                />
            </div>
            <div className="form-groups">
                <label className="text-primary">Color</label>
                <select name="color"
                    value={color}
                    className="form-control"
                    onChange={handleChange}
                    style={{ border: "2px solid green" }}

                >
                    {
                        colors.map(c => <option key={c} value={c}>
                            {c}
                        </option>)
                    }
                </select>
            </div>

            <div className="form-groups">
                <label className="text-primary">Brand</label>
                <select name="brand"
                    value={brand}
                    style={{ border: "2px solid green" }}

                    className="form-control"
                    onChange={handleChange}
                >
                    <option >Please Select</option>
                    {
                        brands.map(c => <option key={c} value={c}>
                            {c}
                        </option>)
                    }
                </select>
            </div>

            <div className="form-group">
                <label className="text-primary"> Category</label>
                <select name="category"
                    className='form-control'
                    onChange={handleChange}
                    value={category}
                    style={{ border: "2px solid green" }}

                >
                    {
                        categories.length > 0 && categories.map((c) => (<option
                            key={c._id}
                            value={Newslugify(c.name,{case:"capitalize",join:" "})} >
                            {Newslugify(c.name,{case:"capitalize",join:" "})}
                        </option>))
                    }
                </select>
            </div>

            <div className="form-group">

                <label className="text-primary">Sub Category</label>

                <select
                    className='form-control'
                    style={{ width: '100%' ,border:"2px solid green"}}
                    placeholder="Please select"
                    value={subs}
                    name="subs"
                    onChange={handleChange}
                >
                    <option>--please select--</option>
                    {
                        subOption.length && subOption.map((s) =>
                            <option
                                key={s._id}
                                value={Newslugify(s.name,{case:"capitalize",join:" "})}
                            > {Newslugify(s.name,{case:"capitalize",join:" "})}</option>)
                    }

                </select>
            </div>
            <div className="form-group">

                <label className="text-primary">Item</label>

                <select
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    value={item}
                    name="item"
                    className="form-control"
                    style={{ border: "2px solid green" }}
                    onChange={handleChange}
                >
                    <option>--please select--</option>

                    {
                        itemOption.length && itemOption.map((s) =>
                            <option
                                key={s._id}
                                value={Newslugify(s.name,{case:"capitalize",join:" "})}
                            > {Newslugify(s.name,{case:"capitalize",join:" "})}</option>)
                    }

                </select>
            </div>


            <br />
            <button className="btn btn-outline-info">
                Save
</button>
        </form>
    )


}


export default ProductUpdateForm