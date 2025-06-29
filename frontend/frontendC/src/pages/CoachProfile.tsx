// CoachProfile.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "lucide-react";
import axios from "axios";

interface CoachProfile {
  id: string;
  fullName: string;
  specialty: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
}

const CoachProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<CoachProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const coachId = localStorage.getItem("coachId");

    if (!coachId) {
      console.error("Coach ID not found in localStorage");
      setLoading(false);
      return;
    }

    axios
      .get<CoachProfile>(`https://localhost:5001/api/CoachProfiles/by-user/${coachId}`)
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load coach profile", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-2xl">Loading...</div>;
  if (!profile) return <div className="p-10 text-2xl">No profile found</div>;

  return (
    <div className="p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Coach Profile</h1>
        <EditIcon
          className="w-8 h-8 text-gray-600 cursor-pointer"
          onClick={() => navigate("/coach/edit-profile")}
        />
      </div>
      <div className="space-y-4 text-xl">
        <p><strong>Full Name:</strong> {profile.fullName}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phoneNumber}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>Specialty:</strong> {profile.specialty}</p>
        <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
      </div>
    </div>
  );
};

export default CoachProfilePage;
