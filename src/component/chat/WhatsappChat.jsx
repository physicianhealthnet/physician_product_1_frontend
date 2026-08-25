import React, { useEffect, useState } from 'react';
import { Typography, Input } from 'antd';
import { Icon } from '@iconify/react';
import { AxiosInstance } from '../../utilities/AxiosInstance';
import { PageSkeleton } from '../ui/Skeleton';

const { Title, Text } = Typography;

const WhatsappChat = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      let clinicId = null;
      const userSession = sessionStorage.getItem("user");
      const masterSession = sessionStorage.getItem("master");
      
      if (userSession) {
        const user = JSON.parse(userSession);
        clinicId = user.clinicId || user.cid;
      } else if (masterSession) {
        const master = JSON.parse(masterSession);
        clinicId = master.clinicId || master.cid;
      }

      const route = clinicId ? `/patient/get-all-by-clinic/${clinicId}` : "/patient/get-all";
      const response = await AxiosInstance.get(route);
      setPatients(response.data.patients || []);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = (phone) => {
    if (!phone) return;
    // Clean up phone number (remove spaces, symbols)
    const cleanedPhone = phone.toString().replace(/\D/g, '');
    window.open(`https://wa.me/${cleanedPhone}`, '_blank');
  };

  const filteredPatients = patients.filter(p => {
    const name = (p.patientName || '').toLowerCase();
    const phone = (p.patientPhone || p.phone || '').toLowerCase();
    const id = (p.patientId || '').toLowerCase();
    const query = search.toLowerCase();
    return name.includes(query) || phone.includes(query) || id.includes(query);
  });

  if (loading) return <PageSkeleton />;

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <Title level={2} className="flex items-center gap-2 mb-1 !mt-0 text-slate-800">
            <Icon icon="solar:chat-round-line-linear" className="text-[#25D366]" />
            WhatsApp Chat & Call
          </Title>
          <Text type="secondary" className="text-slate-500">
            Select a patient to start a WhatsApp conversation.
          </Text>
        </div>
        <Input 
          prefix={<Icon icon="solar:magnifer-linear" className="text-slate-400" />}
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
          allowClear
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pb-6 overflow-y-auto">
        {filteredPatients.map((patient) => {
          const phone = patient.patientPhone || patient.phone;
          return (
            <div 
              key={patient._id || patient.patientId}
              onClick={() => handleWhatsAppClick(phone)}
              className="relative group bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-36"
            >
              {/* Default State */}
              <div className="p-5 h-full flex flex-col justify-center transition-opacity duration-300 group-hover:opacity-0 bg-gradient-to-br from-white to-slate-50/50">
                <div className="font-bold text-slate-800 text-lg truncate mb-2">
                  {patient.patientName || "Unknown"}
                </div>
                <div className="text-slate-600 text-[14px] flex items-center gap-2 mb-2 font-medium">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <Icon icon="solar:phone-linear" width={14} />
                  </div>
                  {phone || "N/A"}
                </div>
                <div className="text-slate-500 text-xs font-semibold bg-slate-100/80 rounded-md px-2 py-1 w-fit border border-slate-200">
                  ID: {patient.patientId || patient._id?.substring(0,8)}
                </div>
              </div>

              {/* Hover State - Fully Green */}
              <div className="absolute inset-0 bg-[#25D366] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-white transform scale-95 group-hover:scale-100 rounded-2xl">
                <Icon icon="ic:baseline-whatsapp" width={48} height={48} className="mb-2 drop-shadow-md" />
                <span className="font-bold tracking-wide text-lg drop-shadow-md">Chat & Call</span>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredPatients.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400">
          <Icon icon="solar:users-group-rounded-linear" width={64} height={64} className="mb-4 opacity-50" />
          <p className="text-lg font-medium">No patients found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default WhatsappChat;
