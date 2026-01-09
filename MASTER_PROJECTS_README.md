# Master Projects Portfolio

A comprehensive collection of projects spanning AI/ML, web development, data science, computer vision, and software engineering.

**Author:** Aditya Chunduri  
**Institution:** University of Southern California, M.S. Applied Data Science

---

## Table of Contents

1. [AI & Machine Learning Projects](#ai--machine-learning-projects)
2. [Web Development Projects](#web-development-projects)
3. [Data Science & Analytics Projects](#data-science--analytics-projects)
4. [Computer Vision Projects](#computer-vision-projects)
5. [Software Engineering Projects](#software-engineering-projects)
6. [Research Projects](#research-projects)

---

## AI & Machine Learning Projects

### 1. AkashicTree
**Location:** `/AkashicTree`  
**Type:** AI Content Generation Pipeline

A fully automated, local-first content generation pipeline that converts simple keywords into complete multimedia videos (Video + Music + Narration). Features include:
- Local-first architecture (runs entirely on your machine)
- Consumer hardware optimized (Apple Silicon MPS and consumer GPUs)
- Memory efficient with Load-Generate-Unload pattern
- Modular architecture with clean separation of concerns
- Pipeline phases: Brain (LLM expansion) → Visual (image/video) → Audio (music/narration) → Assembly (FFmpeg stitching)

**Tech Stack:** Python, PyTorch, Stable Diffusion, MusicGen, TTS, FFmpeg, Ollama

---

### 2. AkashicTree_Web
**Location:** `/AkashicTree/AkashicTree_Web`  
**Type:** AI-Powered Marketing Video Generation Platform

An end-to-end automated content creation platform that transforms marketing briefs into complete video assets. Orchestrates AI models to generate scripts, images, voiceovers, and final videos while maintaining strict brand compliance for spiritual and wellness organizations.

**Features:**
- Script generation with brand compliance validation
- Image generation using Stable Diffusion
- Voice synthesis with Coqui TTS
- Video assembly with MoviePy
- Quality gates for brand compliance
- Campaign planning and batch generation
- Comprehensive telemetry and logging

**Tech Stack:** Flask, LangChain, Ollama, Diffusers, PyTorch, Coqui TTS, MoviePy, ChromaDB

---

### 3. AutoMLProject (MetaLearnML)
**Location:** `/AutoMLProject`  
**Type:** Intelligent AutoML System with Meta-Learning

A complete, self-improving AutoML engine that automatically understands datasets, selects preprocessing strategies, chooses models, and learns from experience using meta-learning. Unlike traditional AutoML tools, MetaLearnML uses meta-learning to predict model performance based on past experiments, making it 10x faster than brute-force search.

**Key Features:**
- Automatic task type inference (regression vs classification)
- Intelligent preprocessing strategy generation and ranking
- Meta-learning for performance prediction
- Self-improvement through experiment history
- Comprehensive report generation (Markdown, JSON, Text)
- Parallel execution support
- Neo4j graph database for experiment tracking

**Tech Stack:** Python, Scikit-learn, PyTorch, Neo4j, FastAPI, Pandas, NumPy

---

### 4. Product_recc_LLM
**Location:** `/Product_recc_LLM`  
**Type:** Multi-Agent Product Recommendation System

A self-contained multi-agent system for product recommendation using LLMs, vector retrieval, and reasoning. Consists of 4 specialized agents:
1. **Data Curator Agent** - Collects, cleans, and standardizes product + review data
2. **Vectorizer Agent** - Embeds and stores data in ChromaDB
3. **Recommender Agent** - Handles user queries and generates recommendations with reasoning
4. **Evaluator Agent** - Tests accuracy and generates performance metrics

**Tech Stack:** Python, OpenAI API, ChromaDB, LangChain, Vector Embeddings

---

### 5. Agent_test (Agentic AI Research Assistant)
**Location:** `/Agent_test`  
**Type:** Production-Ready AI Research Assistant

A production-ready web application featuring open-source LLM integration, dynamic web crawling, and Knowledge RAG capabilities for intelligent research and automation.

**Features:**
- Open-source LLM integration (HuggingFace Transformers)
- Dynamic web crawling and content extraction
- Knowledge RAG system with vector embeddings
- Research workflow with comprehensive reports
- Tool ecosystem (calculator, file operations, web search)
- Multi-tier memory system
- Observability (OpenTelemetry, Prometheus)
- Security (OWASP best practices, input validation)

**Tech Stack:** FastAPI, HuggingFace Transformers, ChromaDB, OpenTelemetry, Prometheus, Docker

---

### 6. model-behavior-lab
**Location:** `/model-behavior-lab`  
**Type:** LLM Behavior Analysis Laboratory

A system for analyzing and scoring LLM model behavior across different prompts and scenarios. Includes analyzers for applying scoring metrics and evaluating model outputs.

**Features:**
- Model behavior analysis
- Scoring system for model outputs
- Result visualization
- Experiment tracking

**Tech Stack:** Python, Ollama, Pandas, JSON

---

### 7. Take_Action_Project (AFDA - Action-First Daily Agent)
**Location:** `/Take_Action_Project`  
**Type:** Action-First Productivity Agent

A personal agent that forces TAKE ACTION by showing only one next step at a time, while keeping your goal/why present as a tiny cue. Designed as a "Do-Engine" for ADHD brains, not a planner.

**Core Features:**
- Goal Token system (holds meaning in background)
- One micro-step at a time (action in foreground)
- Action-gating (unlock clarity only after motion)
- Proof-of-work system
- Minimal interface with essential commands
- Learning system that adapts to user behavior

**Tech Stack:** Python, Streamlit, JSON storage, LLM integration

---

## Web Development Projects

### 8. Portfolio
**Location:** `/Portfolio`  
**Type:** Modern Interactive Portfolio Website

A modern, interactive portfolio website showcasing systems engineering work with a focus on AI infrastructure, evaluation systems, and reproducible pipelines.

**Features:**
- Dual Mode Toggle (Signal/Story perspectives)
- Interactive project cards with detailed case studies
- Search & Filter functionality
- Thinking Loop visualization
- Responsive design (desktop and mobile)
- FAQ Bot integration

**Tech Stack:** React 18, Vite, Tailwind CSS, Lucide React

---

## Data Science & Analytics Projects

### 9. ChatDB
**Location:** `/ChatDB`  
**Type:** Natural Language to SQL Query System

An intelligent database query system that converts natural language questions into SQL queries. Automatically analyzes CSV datasets, loads them into SQL databases, and generates appropriate SQL queries based on user input.

**Features:**
- CSV to SQL loading
- Natural language to SQL translation
- Query generation with examples
- Interactive CLI
- Automatic schema detection
- Support for GROUP BY, WHERE, aggregations

**Tech Stack:** Python, SQLite, Pandas, SQLAlchemy

---

### 10. Project (Movie Analysis)
**Location:** `/Project/project-Chunduri-Aditya`  
**Type:** Movie Rating Analysis Project

A data science project exploring the influence of Rotten Tomatoes reviews on IMDb movie ratings. Integrates data from IMDb, Rotten Tomatoes, and Kaggle using web scraping, data cleaning, sentiment analysis, and visualization.

**Features:**
- Web scraping (BeautifulSoup, Selenium)
- Data cleaning and integration
- Sentiment analysis on reviews
- Correlation analysis
- Data visualization
- Statistical analysis

**Tech Stack:** Python, BeautifulSoup, Selenium, Pandas, NLTK, Matplotlib

---

### 11. cfo-command-center
**Location:** `/cfo-command-center`  
**Type:** Finance Data Platform

An end-to-end finance data platform: RPA ingestion → Python ETL/ML → PostgreSQL warehouse → Power BI dashboards → automated PDF reports.

**Features:**
- ETL pipeline for financial data
- PostgreSQL data warehouse
- Automated report generation
- Power BI integration
- Sample transaction processing

**Tech Stack:** Python, PostgreSQL, Docker, Power BI, ETL pipelines

---

## Computer Vision Projects

### 12. ai-fitness-coach
**Location:** `/ai-fitness-coach`  
**Type:** Real-Time Fitness Pose Detection

A real-time fitness coaching application that uses computer vision and pose detection to analyze exercise form and provide feedback through webcam feed.

**Features:**
- Real-time pose detection using MediaPipe
- Webcam integration with OpenCV
- Visual feedback with pose landmarks
- Mirror mode for natural viewing

**Tech Stack:** Python, OpenCV, MediaPipe, NumPy

---

### 13. CVD Project
**Location:** `/CVD Project`  
**Type:** Retinal Microvascular Analysis for CVD Risk Assessment

A deep learning project for cardiovascular disease (CVD) risk assessment through retinal fundus image analysis and microvascular segmentation.

**Features:**
- Retinal vessel segmentation (U-Net architecture)
- Arteriovenous classification
- Mask fine-tuning
- Biomarker extraction
- Automated dataset generation
- MLflow experiment tracking

**Tech Stack:** TensorFlow/Keras, Segmentation Models, OpenCV, MLflow, NumPy, Pandas

---

## Software Engineering Projects

### 14. Project_c (Event Stream Engine)
**Location:** `/Project_c/data-stream-engine`  
**Type:** In-Memory Event Stream Engine (C)

A C project that implements an event stream using singly linked lists. Perfect for learning dynamic memory, pointer manipulation, and modular C design.

**Features:**
- Add events dynamically (id, source, payload)
- Print full stream contents
- Search events by ID
- Delete events by ID
- Reverse stream order
- Interactive CLI with memory safety

**Tech Stack:** C, Makefile, Linked Lists, Dynamic Memory Management

---

### 15. Poker_advisor
**Location:** `/Poker_advisor`  
**Type:** Monte Carlo Poker Decision Advisor

A Monte Carlo-based poker decision advisor for Texas Hold'em that provides equity calculations, expected value analysis, and action recommendations.

**Features:**
- Monte Carlo equity simulation
- Preflop and postflop analysis
- Risk profiles (SAFE, STANDARD, AGGRESSIVE)
- Opponent modeling (TIGHT, BALANCED, LOOSE)
- Expected value calculation
- Fold equity estimation
- Action logging to CSV

**Tech Stack:** Python (standard library only), Monte Carlo methods

---

### 16. localgpt
**Location:** `/localgpt`  
**Type:** Local LLM Testing and Comparison Tool

A lightweight application for testing and comparing different language models through the Ollama API. Allows users to query multiple models simultaneously and compare their responses.

**Features:**
- Multi-model testing
- Ollama integration
- Model comparison
- Tutoring application
- Response synthesis

**Tech Stack:** Python, Ollama, Requests

---

## AI Content & Media Projects

### 17. ai-remixmate
**Location:** `/ai-remixmate`  
**Type:** AI-Powered Music Remixing Engine

An intelligent music remixing engine that takes one song and finds the most compatible match based on musical features, then blends the two using dynamic mixing techniques.

**Features:**
- Remix two songs intelligently (manual or auto match)
- Find most similar songs using MFCC, tempo, chroma features
- Separate vocals and instruments using Demucs
- Build song database for similarity search
- Lyrics extraction (Whisper or local ASR)
- Modular and expandable script-based design

**Tech Stack:** Python, Librosa, Demucs, Whisper, NumPy, Pydub

---

### 18. ai-health-journal
**Location:** `/ai-health-journal`  
**Type:** AI-Powered Health Journaling Application

A Flask-based web application for health journaling with AI-powered analysis and prompt generation. Uses local LLMs (Ollama) for sentiment analysis and journaling assistance.

**Features:**
- Journal entry submission
- AI-powered sentiment analysis
- Journaling prompt generation
- Chat history tracking
- Session management
- Multiple LLM model support

**Tech Stack:** Flask, Ollama, HTML/CSS, JavaScript, JSON

---

## Project Statistics

- **Total Projects:** 18
- **AI/ML Projects:** 7
- **Web Development:** 1
- **Data Science:** 3
- **Computer Vision:** 2
- **Software Engineering:** 3
- **Content/Media:** 2

## Common Technologies Across Projects

- **Python:** Primary language for most projects
- **Machine Learning:** TensorFlow, PyTorch, Scikit-learn
- **LLMs:** Ollama, OpenAI API, LangChain, HuggingFace
- **Web Frameworks:** Flask, FastAPI, React
- **Data Processing:** Pandas, NumPy, SQL
- **Computer Vision:** OpenCV, MediaPipe, Segmentation Models
- **DevOps:** Docker, MLflow, Git

## Project Maturity Levels

- **Production Ready:** Agent_test, Portfolio, AutoMLProject, AkashicTree_Web
- **Functional Prototypes:** Most other projects
- **Research/Experimental:** CVD Project, model-behavior-lab

## Getting Started

Each project has its own README file with:
- Installation instructions
- Usage examples
- Project structure
- Technology stack details
- Future enhancements

Navigate to individual project directories for specific documentation.

---

## Contact

**Aditya Chunduri**  
M.S. Applied Data Science  
University of Southern California  
Email: chunduri@usc.edu  
GitHub: [Chunduri-Aditya](https://github.com/Chunduri-Aditya)  
LinkedIn: [adityachunduri](https://linkedin.com/in/adityachunduri)

---

*Last Updated: January 2025*
