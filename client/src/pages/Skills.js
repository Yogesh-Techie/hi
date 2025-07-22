import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './Home.css'; // Reusing shared styles

// Local images
import helmLogo from '../assets/helm.png';
import cloudwatchLogo from '../assets/cloudwatch.png';

const skills = [
  { name: 'Jenkins', icon: 'https://img.icons8.com/color/48/jenkins.png' },
  { name: 'GitHub Actions', icon: 'https://img.icons8.com/fluency/48/github.png' },
  { name: 'Terraform', icon: 'https://img.icons8.com/color/48/terraform.png' },
  { name: 'Docker', icon: 'https://img.icons8.com/fluency/48/docker.png' },
  { name: 'Kubernetes', icon: 'https://img.icons8.com/color/48/kubernetes.png' },
  { name: 'Helm', icon: helmLogo },
  { name: 'Prometheus', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Prometheus_software_logo.svg' },
  { name: 'Grafana', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Grafana_icon.svg' },
  { name: 'CloudWatch', icon: cloudwatchLogo },
  { name: 'Git', icon: 'https://img.icons8.com/color/48/git.png' },
  { name: 'Linux', icon: 'https://img.icons8.com/color/48/linux.png' },
  { name: 'Python', icon: 'https://img.icons8.com/color/48/python.png' },
];

function Skills() {
  return (
    <div className="page-section skills-section fade-in">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Skills & Tools</h2>
          <Row>
            {skills.map((skill, i) => (
              <Col xs={6} md={4} lg={3} className="mb-4" key={i}>
                <Card className="text-center shadow-sm">
                  <Card.Body>
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      height="40"
                      className="mb-2"
                    />
                    <Card.Title>{skill.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </div>
  );
}

export default Skills;
