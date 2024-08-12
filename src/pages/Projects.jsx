import React, { useEffect, useState } from 'react';
import EmptyProject from '../components/project/Empty';
import ProjectList from '../components/project/List';
import { useSelector } from 'react-redux';

const Projects = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const organization = useSelector(state => state.auth.organization);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      if (accessToken && organization) {
        try {
          const response = await fetch(`http://localhost:3000/project/org/${organization.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setProjects(data);
          } else {
            console.error('Failed to fetch projects:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      }
    };

    fetchProjects();
  }, [accessToken, organization]);

  return (
    <div>
      {projects && projects.length>0
      ? (<ProjectList projects={projects}/>)
      : (<EmptyProject/>)
      }
      
    </div>
  );
};

export default Projects;
