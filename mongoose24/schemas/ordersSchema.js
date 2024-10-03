var clientSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: false }
});

var orderDetailsSchema = new Schema({
    confirmed: { type: Boolean, required: true, default: false },
    service: { type: String, required: true },
    delivery: { type: String, required: false },
    payment: { type: String, required: false },
    status: { type: String, required: true, default: "new order" },
});

var orderSchema = new Schema({
    reference: { type: String, required: true },
    orderdetails: orderDetailsSchema,
    client: clientSchema,
    wheelspec: [wheelSchema],
    invoice: { type: Schema.Types.ObjectId, ref: 'Invoice' }
});

// https://stackoverflow.com/questions/44161946/returning-specific-fields-with-mongoose