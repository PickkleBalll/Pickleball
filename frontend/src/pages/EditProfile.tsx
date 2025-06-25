import React, { useRef, useState } from "react";
import image16 from "../assets/Image/16.jpg";

const EditProfile: React.FC = () => {
    const [avatar, setAvatar] = useState<string>(image16);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [editingField, setEditingField] = useState<string | null>(null);
    const [profileData, setProfileData] = useState({
        name: "Selena Arven",
        dob: "12/12/1999",
        gender: "Female",
        email: "arven@gmail.com",
        phone: "01234567910",
        interest: "Pickleball",
    });

    const handleInputChange = (field: string, value: string) => {
        setProfileData((prev) => ({ ...prev, [field]: value }));
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setAvatar(imageURL);
        }
    };

    const fields = [
        { label: "Fullname", key: "name" },
        { label: "Date of birth", key: "dob" },
        { label: "Gender", key: "gender" },
        { label: "Email", key: "email" },
        { label: "Phone number", key: "phone" },
        { label: "Interest", key: "interest" },
    ];

    return (
        <div className="bg-[#f0f0f0] min-h-screen font-['Roboto'] pb-20">
            <div className="max-w-[1000px] mx-auto px-4">
                {/* Avatar và mô tả */}
                <section className="flex items-center gap-12 mt-12 mb-16">
                    <img
                        src={avatar}
                        alt="Profile"
                        className="w-[200px] h-[200px] rounded-full object-cover border"
                    />
                    <div className="flex flex-col gap-8">
                        <p className="font-bold text-[#a7a7a7] text-[22px] leading-8">
                            This will be displayed to other users when they view your profile or posts. <br />
                            Max size: 2MB
                        </p>
                        <button
                            className="w-[129px] h-[47px] rounded-[15px] border border-[#727272] bg-[#f0f0f0] font-bold shadow"
                            onClick={handleUploadClick}
                        >
                            UPLOAD
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                </section>

                {/* Thông tin cơ bản */}
                <h2 className="font-bold text-3xl mb-8 text-center">Basic Information</h2>
                <div className="flex flex-col gap-6">
                    {fields.map(({ label, key }) => (
                        <div key={key} className="flex items-center gap-4 py-2">
                            <div className="w-[250px] text-[25px] font-medium">{label}</div>
                            {editingField === key ? (
                                <input
                                    type="text"
                                    value={(profileData as any)[key]}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                    onBlur={() => setEditingField(null)}
                                    autoFocus
                                    className="flex-1 text-[25px] font-medium text-black bg-white px-2 py-1 rounded border"
                                />
                            ) : (
                                <div className="flex-1 text-[25px] font-medium text-[#a7a7a7]">
                                    {(profileData as any)[key]}
                                </div>
                            )}
                            <button
                                className="w-[30px] h-[30px] p-0 text-gray-500 hover:text-black"
                                onClick={() => setEditingField(key)}
                            >
                                ✎
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
