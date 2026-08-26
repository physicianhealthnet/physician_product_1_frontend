import React, { useEffect, useState } from 'react';
import { Typography, Input, Collapse, Table, Button } from 'antd';
import { Icon } from '@iconify/react';
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { AxiosInstance, AxiosInstanceSecondryServer } from '../../utilities/AxiosInstance';
import { PageSkeleton } from '../ui/Skeleton';

dayjs.extend(isSameOrAfter);

const { Title, Text } = Typography;

const WhatsappChat = () => {
  const [internalAppts, setInternalAppts] = useState([]);
  const [webAppts, setWebAppts] = useState([]);
  const [upcomingReviews, setUpcomingReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState(dayjs().format("YYYY-MM-DD"));

  const fetchData = async () => {
    setLoading(true);
    try {
      const userSession = sessionStorage.getItem("user");
      const masterSession = sessionStorage.getItem("master");
      let clinicId = "";
      if (userSession) {
        clinicId = JSON.parse(userSession).cid || JSON.parse(userSession).clinicId;
      } else if (masterSession) {
        clinicId = JSON.parse(masterSession).cid || JSON.parse(masterSession).clinicId;
      }

      const [internalRes, webRes, trackerRes] = await Promise.allSettled([
        AxiosInstance.get(
          `/appointments/get?date=${filterDate}&page=1&limit=1000`
        ),
        AxiosInstanceSecondryServer.get(
          `user-appointment/clinic-appointments/${clinicId}`
        ),
        AxiosInstance.get(`/treatment-tracker/get-all`)
      ]);

      // 1. Internal & Clinic Appointments
      let internalData = [];
      if (internalRes.status === "fulfilled") {
        internalData = internalRes.value.data.data || [];
      }
      setInternalAppts(internalData);

      // 2. Web Appointments
      let webData = [];
      if (webRes.status === "fulfilled") {
        const allWebAppts = webRes.value.data.data || [];
        webData = allWebAppts.filter((appt) => {
          if (!appt.appointmentDate) return false;
          const apptDate = dayjs(appt.appointmentDate).format("YYYY-MM-DD");
          if (filterDate && apptDate !== filterDate) return false;
          return true;
        });
      }
      setWebAppts(webData);

      // 3. Upcoming Followups
      let upcoming = [];
      if (trackerRes.status === "fulfilled") {
        const cleaned = trackerRes.value.data.flatMap((row) => {
          if (row.upcomming_sessions?.length > 0) {
            return row.upcomming_sessions
              .filter((s) => s.nextReview && s.nextReview !== "")
              .map((s) => ({
                ...s,
                patientName: row.patientName || "",
                patientPhone: row.phoneNumber || row.patientPhone || "",
              }));
          }
          if (row.nextReview && row.nextReview !== "") {
            return [{
              ...row,
              patientName: row.patientName || "",
              patientPhone: row.phoneNumber || row.patientPhone || "",
            }];
          }
          return [];
        });

        const today = dayjs().startOf("day");
        upcoming = cleaned
          .filter((item) => dayjs(item.nextReview).isSameOrAfter(today, "day"))
          .sort((a, b) => dayjs(a.nextReview) - dayjs(b.nextReview));
      }
      setUpcomingReviews(upcoming);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterDate]);

  const handleWhatsAppClick = (phone) => {
    if (!phone) return;
    const cleanedPhone = phone.toString().replace(/\D/g, '');
    window.open(`https://wa.me/${cleanedPhone}`, '_blank');
  };

  const onRowClick = (record) => {
    const phone = record.phoneNumber || record.patientPhone || record.patientPhno;
    return {
      onClick: () => handleWhatsAppClick(phone),
      className: phone ? "group cursor-pointer whatsapp-table-row transition-all duration-300" : ""
    };
  };

  const patientNameRender = (text) => (
    <>
      <span className="group-hover:opacity-0 transition-opacity duration-300">{text}</span>
      <div className="hover-overlay absolute inset-0 bg-[#25D366] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 m-[2px] rounded-md shadow-sm">
        <Icon icon="ic:baseline-whatsapp" className="text-2xl mr-2 drop-shadow-md" />
        <span className="font-bold text-lg drop-shadow-md tracking-wide">Chat & Call</span>
      </div>
    </>
  );

  const internalColumns = [
    { title: 'Patient Name', dataIndex: 'patientName', key: 'patientName', className: 'font-bold text-slate-800', render: patientNameRender },
    { title: 'Phone', dataIndex: 'phoneNumber', key: 'phoneNumber', render: (text) => <span className="group-hover:opacity-0 transition-opacity duration-300">{text || 'N/A'}</span> },
    { title: 'Time', dataIndex: 'startTime', key: 'startTime', render: (text, record) => <span className="group-hover:opacity-0 transition-opacity duration-300">{`${text || 'TBD'} - ${record.endTime || 'TBD'}`}</span> },
    { title: 'Doctor', dataIndex: 'doctor', key: 'doctor', render: (text) => <span className="group-hover:opacity-0 transition-opacity duration-300">{text || '—'}</span> },
  ];

  const webColumns = [
    { title: 'Patient Name', dataIndex: 'patientName', key: 'patientName', className: 'font-bold text-slate-800', render: patientNameRender },
    { title: 'Phone', key: 'phone', render: (_, record) => <span className="group-hover:opacity-0 transition-opacity duration-300">{record.phoneNumber || record.patientPhone || record.patientPhno || 'N/A'}</span> },
    { title: 'Time', key: 'time', render: (_, record) => <span className="group-hover:opacity-0 transition-opacity duration-300">{record.selectedSlot || 'TBD'}</span> },
    { title: 'Doctor', key: 'doctor', render: (_, record) => <span className="group-hover:opacity-0 transition-opacity duration-300">{record.docName || record.doctor || '—'}</span> },
  ];

  const followUpColumns = [
    { title: 'Patient Name', dataIndex: 'patientName', key: 'patientName', className: 'font-bold text-slate-800', render: patientNameRender },
    { title: 'Phone', key: 'phone', render: (_, record) => <span className="group-hover:opacity-0 transition-opacity duration-300">{record.phoneNumber || record.patientPhone || record.patientPhno || 'N/A'}</span> },
    { title: 'Target Date', dataIndex: 'nextReview', key: 'nextReview', render: (text) => <span className="group-hover:opacity-0 transition-opacity duration-300">{`${dayjs(text).format("MMM DD")} (${dayjs(text).diff(dayjs().startOf('day'), 'day')} days)`}</span> },
    { title: 'Reason', key: 'reason', render: (_, record) => <span className="group-hover:opacity-0 transition-opacity duration-300">{record.reason || record.treatmentName || "Routine Review"}</span> },
  ];



  const filterBySearch = (list) => {
    if (!search) return list;
    const query = search.toLowerCase();
    return list.filter(item => {
      const name = (item.patientName || '').toLowerCase();
      const phone = (item.phoneNumber || item.patientPhone || item.patientPhno || '').toLowerCase();
      return name.includes(query) || phone.includes(query);
    });
  };

  if (loading) return <PageSkeleton />;

  return (
    <div className="p-6 h-full flex flex-col">
      <style>{`
        .whatsapp-table-row {
          transform: scale(1);
        }
        .whatsapp-table-row > td {
          position: static !important;
        }
        .whatsapp-table-row:hover > td {
          background-color: transparent !important;
          border-bottom-color: transparent !important;
        }
      `}</style>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <Title level={2} className="flex items-center gap-2 mb-1 !mt-0 text-slate-800">
            <Icon icon="solar:chat-round-line-linear" className="text-[#25D366]" />
            WhatsApp Chat & Call
          </Title>
          <Text type="secondary" className="text-slate-500">
            Select an appointment to start a WhatsApp conversation.
          </Text>
        </div>
        
        <div className="flex items-center gap-4">
          <Input 
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-40"
          />
          <Input 
            prefix={<Icon icon="solar:magnifer-linear" className="text-slate-400" />}
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56"
            allowClear
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <Collapse
          defaultActiveKey={[]}
          className="bg-transparent w-full"
          bordered={false}
          items={[
            {
              key: '1',
              label: (
                <div className="flex items-center gap-2 py-1">
                  <Icon icon="duo-icons:building" className="text-emerald-500 text-xl" />
                  <h3 className="font-black text-slate-700 tracking-tight text-sm uppercase m-0">
                    Internal & Clinic Appointments
                  </h3>
                </div>
              ),
              children: (
                <Table 
                  dataSource={filterBySearch(internalAppts)} 
                  columns={internalColumns} 
                  rowKey={(record, index) => record._id || `internal-${index}`}
                  pagination={false}
                  size="small"
                  onRow={onRowClick}
                  className="custom-table w-full border-t border-slate-100"
                />
              ),
              className: "bg-white border border-slate-200/50 rounded-2xl overflow-hidden shadow-sm mb-6",
              style: { padding: 0 }
            },
            {
              key: '2',
              label: (
                <div className="flex items-center gap-2 py-1">
                  <Icon icon="solar:global-bold-duotone" className="text-purple-500 text-xl" />
                  <h3 className="font-black text-slate-700 tracking-tight text-sm uppercase m-0">
                    Online Web Appointments
                  </h3>
                </div>
              ),
              children: (
                <Table 
                  dataSource={filterBySearch(webAppts)} 
                  columns={webColumns} 
                  rowKey={(record, index) => record._id || `web-${index}`}
                  pagination={false}
                  size="small"
                  onRow={onRowClick}
                  className="custom-table w-full border-t border-slate-100"
                />
              ),
              className: "bg-white border border-slate-200/50 rounded-2xl overflow-hidden shadow-sm mb-6",
              style: { padding: 0 }
            },
            {
              key: '3',
              label: (
                <div className="flex items-center gap-2 py-1">
                  <Icon icon="solar:calendar-date-bold-duotone" className="text-blue-500 text-xl" />
                  <h3 className="font-black text-slate-700 tracking-tight text-sm uppercase m-0">
                    Upcoming Appointments (Old Patients)
                  </h3>
                </div>
              ),
              children: (
                <Table 
                  dataSource={filterBySearch(upcomingReviews)} 
                  columns={followUpColumns} 
                  rowKey={(record, index) => record._id || record.id || `tracker-${index}`}
                  pagination={false}
                  size="small"
                  onRow={onRowClick}
                  className="custom-table w-full border-t border-slate-100"
                />
              ),
              className: "bg-white border border-slate-200/50 rounded-2xl overflow-hidden shadow-sm",
              style: { padding: 0 }
            }
          ]}
        />
      </div>
    </div>
  );
};

export default WhatsappChat;
