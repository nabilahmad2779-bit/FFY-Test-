
import React from 'react';
import HRDepartment from './departments/HRDepartment';
import PRDepartment from './departments/PRDepartment';
import ITDepartment from './departments/ITDepartment';
import OpsDepartment from './departments/OpsDepartment';
import AcadDepartment from './departments/AcadDepartment';

interface DepartmentDetailViewProps {
  dept: any;
  navigate: (path: string) => void;
}

const DepartmentDetailView: React.FC<DepartmentDetailViewProps> = ({ dept, navigate }) => {
  switch (dept.id) {
    case 'hr':
      return <HRDepartment dept={dept} navigate={navigate} />;
    case 'pr':
      return <PRDepartment dept={dept} navigate={navigate} />;
    case 'it':
      return <ITDepartment dept={dept} navigate={navigate} />;
    case 'ops':
      return <OpsDepartment dept={dept} navigate={navigate} />;
    case 'acad':
      return <AcadDepartment dept={dept} navigate={navigate} />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center text-white">
           <p>Department configuration not found.</p>
        </div>
      );
  }
};

export default DepartmentDetailView;
