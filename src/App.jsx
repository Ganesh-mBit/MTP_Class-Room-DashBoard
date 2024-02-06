import './App.css'
import { useState } from 'react';
import { INITIAL_CLASS_DATA } from './Global/ClassData'

function App() {
  const [data, setData] = useState(INITIAL_CLASS_DATA);
  const DEFAULT_FOMR_VALUE = {
    id: "",
    stdId: "",
    assignment: "",
    status: "",
  };
  const [formData, setFormData] = useState(DEFAULT_FOMR_VALUE);

  const handleDeleteFunc = (id) => {
    setData((prev) => prev.filter((classInfo) => classInfo['school-id'] !== id))
  }

  const handleInputForm = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleAddClass = () => {
    const newClass = {
      id: formData.id ? formData.id : (data.length + 1),
      "school-id": formData.id ? formData.id : (data.length + 1),
      students: [
        {
          "student-id": formData.stdId,
          assignment: formData.assignment,
        },
      ],
      status: formData.status.toUpperCase(),
    }
    if (formData.id) {
      setData((prev) => prev.map((classInfo) => classInfo.id === formData.id ? newClass : classInfo))
    } else {
      setData([...data, newClass]);
    }
    setFormData(DEFAULT_FOMR_VALUE);
  }

  const handleUpdateClass = (classInfo) => {
    setFormData({
      id: classInfo.id,
      stdId: classInfo.students[0]['student-id'],
      assignment: classInfo.students[0].assignment,
      status: classInfo.status,
    })
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
      <nav>
        <h1>Dashboard</h1>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <h1 style={{ textAlign: "center" }}>Add new class details</h1>
        <div style={{ display: 'flex', justifyContent: "space-between", gap: "10px" }}>
          <input style={{ padding: "6px" }} type="text" value={formData.stdId} onChange={(e) => handleInputForm('stdId', e.target.value)} placeholder='Enter student Id' />
          <input style={{ padding: "6px" }} type="text" value={formData.assignment} onChange={(e) => handleInputForm('assignment', e.target.value)} placeholder='Enter Assignment' />
          <input style={{ padding: "6px" }} type="text" value={formData.status} onChange={(e) => handleInputForm('status', e.target.value)} placeholder='Enter status' />
        </div>
        <button style={{ padding: "8px 16px", borderRadius: "25px", backgroundColor: "teal", color: "white", textTransform: "uppercase", cursor: "pointer" }} disabled={!formData.stdId && !formData.assignment && !formData.status} onClick={handleAddClass}>{formData.id ? "Update" : "Add"} Class</button>
      </div>
      <div>
        <table style={{ border: "1px solid gray", padding: "10px" }}>
          <thead>
            <tr>
              <th>
                School Id
              </th>
              <th>
                Student Id
              </th>
              <th>
                Assignment
              </th>
              <th>
                Status
              </th>
              <th>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((classInfo) => (
              <tr key={classInfo.id}>
                <td>
                  {classInfo['school-id']}
                </td>
                <td>
                  {classInfo.students[0]['student-id']}
                </td>
                <td>
                  {classInfo.students[0].assignment}
                </td>
                <td>
                  {classInfo.status}
                </td>
                <td style={{ display: "flex", gap: "12px" }}>
                  <button style={{ padding: "4px 8px", color: "orange", backgroundColor: "transparent", border: "1px solid orange", borderRadius: "12px", cursor: "pointer", fontSize: "10px" }} onClick={() => handleUpdateClass(classInfo)}>
                    Update
                  </button>
                  <button style={{ padding: "4px 8px", color: "red", backgroundColor: "transparent", border: "1px solid red", borderRadius: "12px", cursor: "pointer", fontSize: "10px" }} onClick={() => handleDeleteFunc(classInfo['school-id'])}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
