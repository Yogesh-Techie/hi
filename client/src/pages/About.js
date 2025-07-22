import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';

function About() {
  return (
    <div className="about-section page-section">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">About Me</h2>

          <p>
            I'm <strong>Yogesh</strong>, a passionate and results-driven <strong>DevOps Engineer</strong> with over 3 years of experience in
            designing, automating, and managing scalable cloud infrastructures. I specialize in <strong>CI/CD</strong>, <strong>Infrastructure
            as Code (IaC)</strong>, container orchestration, and cloud-native DevOps practices.
          </p>

          <p>
            Having worked across <strong>eCommerce</strong>, <strong>healthcare</strong>, and <strong>fintech</strong> domains, I've contributed to
            mission-critical projects that improved system uptime, reduced deployment time, and optimized cloud costs. My hands-on
            expertise includes <strong>AWS</strong>, <strong>Docker</strong>, <strong>Kubernetes (EKS)</strong>, <strong>Terraform</strong>,
            <strong> Jenkins</strong>, and observability tools like <strong>Prometheus</strong>, <strong>Grafana</strong>, and <strong>CloudWatch</strong>.
          </p>

          <p>
            Beyond my full-time roles, I’ve successfully delivered freelance DevOps projects for startups and small businesses —
            including secure AWS environments, automated CI/CD pipelines, containerizing legacy applications, and production-ready
            deployments.
          </p>

          <h4 className="mt-5 mb-3">📌 Key Achievements</h4>
          <ul>
            <li>✅ Reduced CI/CD deployment time by <strong>35%</strong> via Jenkins optimization and Docker caching.</li>
            <li>✅ Cut AWS costs by <strong>20%</strong> through rightsizing and resource efficiency.</li>
            <li>✅ Led monolith-to-microservices migration with Docker + Kubernetes, improving uptime by <strong>25%</strong>.</li>
            <li>✅ Delivered full freelance DevOps pipelines with automated deployment and secure infra design.</li>
          </ul>

          <h4 className="mt-5 mb-3">🤝 Now Open For:</h4>
          <ul>
            <li>📍 Full-time DevOps Engineer roles</li>
            <li>📍 Freelance or contract work in AWS, CI/CD, Kubernetes, or cloud infrastructure</li>
          </ul>

          <p className="mt-4">
            Let’s build <strong>robust, scalable, and production-grade systems</strong> that drive business growth and uptime.
          </p>
        </motion.div>
      </Container>
    </div>
  );
}

export default About;
