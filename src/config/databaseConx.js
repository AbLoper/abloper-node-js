import mongoose from 'mongoose';

export const connectDB = async () => {
    if (!process.env.DB_URL || !process.env.DB_PASSWORD) {
        throw new Error('❌ DB_URL or DB_PASSWORD is missing in environment variables!');
    }

    const MongoDB = process.env.DB_URL.replace(
        '<db_password>',
        encodeURIComponent(process.env.DB_PASSWORD)
    );

    try {
        await mongoose.connect(MongoDB);
        console.log('✅ Connected to MongoDB successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1); // إيقاف التطبيق إذا فشل الاتصال
    }
};