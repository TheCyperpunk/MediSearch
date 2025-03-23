
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  FileText, 
  Pill, 
  AlertCircle, 
  Calendar, 
  Activity, 
  User,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const PatientDashboard: React.FC = () => {
  return (
    <div className="h-[calc(100vh-9rem)] overflow-auto p-4 bg-gradient-to-br from-white/40 via-white/60 to-blue-50/40 backdrop-blur-md rounded-lg border border-white/20 shadow-lg hover:shadow-blue-200/40 transition-all duration-500">
      <div className="mb-6 animate-slide-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#0ea5e9] via-[#2563eb] to-[#4f46e5] text-white flex items-center justify-center text-xl font-medium shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 animate-pulse-slow">
              JD
            </div>
            <div>
              <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-[#4f46e5]">John Doe</h2>
              <p className="text-muted-foreground">42 years • Male • MRN: 987654</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="bg-gradient-to-r from-[#0ea5e9]/10 to-[#2563eb]/10 text-[#2563eb] px-3 py-1 rounded-full text-sm font-medium flex items-center hover:shadow-md hover:scale-105 transition-all duration-300">
              <Heart className="h-3.5 w-3.5 mr-1" />
              Hypertension
            </div>
            <div className="bg-gradient-to-r from-[#2563eb]/10 to-[#4f46e5]/10 text-[#4f46e5] px-3 py-1 rounded-full text-sm font-medium flex items-center hover:shadow-md hover:scale-105 transition-all duration-300">
              <Activity className="h-3.5 w-3.5 mr-1" />
              Type 2 Diabetes
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full animate-fade-in">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="medical-history" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Medical History</span>
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            <span className="hidden sm:inline">Medications</span>
          </TabsTrigger>
          <TabsTrigger value="lab-results" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Lab Results</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Patient Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date of Birth:</span>
                    <span>May 15, 1981</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Address:</span>
                    <span>123 Main St, Anytown</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Insurance:</span>
                    <span>HealthPlus (Policy #1234567)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Primary Care:</span>
                    <span>Dr. Sarah Johnson</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Office Visit</p>
                      <p className="text-xs text-muted-foreground">October 15, 2023</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Lab Results Processed</p>
                      <p className="text-xs text-muted-foreground">October 1, 2023</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Pill className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Prescription Refill</p>
                      <p className="text-xs text-muted-foreground">September 25, 2023</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Next Appointment</p>
                      <p className="text-xs text-muted-foreground">November 10, 2023</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Health Metrics</CardTitle>
              <CardDescription>Updated October 1, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Blood Pressure</span>
                    <span className="text-sm">128/85 mmHg</span>
                  </div>
                  <Progress value={75} className="h-2 bg-gradient-to-r from-[#0ea5e9] to-[#4f46e5] animate-pulse" />
                  <p className="text-xs text-muted-foreground">
                    Slightly elevated, monitor closely
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">HbA1c</span>
                    <span className="text-sm">7.2%</span>
                  </div>
                  <Progress value={65} className="h-2 bg-gradient-to-r from-[#0ea5e9] to-[#4f46e5] animate-pulse" />
                  <p className="text-xs text-muted-foreground">
                    Higher than target of 6.5%
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Cholesterol</span>
                    <span className="text-sm">185 mg/dL</span>
                  </div>
                  <Progress value={50} className="h-2 bg-gradient-to-r from-[#0ea5e9] to-[#4f46e5] animate-pulse" />
                  <p className="text-xs text-muted-foreground">
                    Within normal range
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-sm font-medium">Alerts</CardTitle>
                <CardDescription>Important notifications</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-medical-muted/30 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Medication Interaction Warning</p>
                    <p className="text-xs text-muted-foreground">
                      Potential interaction between Lisinopril and OTC supplements reported by patient.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-medical-muted/30 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-medical-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Elevated HbA1c Levels</p>
                    <p className="text-xs text-muted-foreground">
                      Trending upward over past 3 measurements. Consider adjusting diabetes management plan.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical-history">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>
                Complete medical history for John Doe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Conditions</h3>
                  <div className="space-y-3">
                    <div className="bg-card border rounded-lg p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Hypertension</h4>
                        <span className="text-sm text-muted-foreground">Diagnosed 2018</span>
                      </div>
                      <p className="text-sm mt-1">Essential hypertension, managed with Lisinopril 10mg daily.</p>
                    </div>
                    <div className="bg-card border rounded-lg p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Type 2 Diabetes</h4>
                        <span className="text-sm text-muted-foreground">Diagnosed 2019</span>
                      </div>
                      <p className="text-sm mt-1">Managed with Metformin 500mg twice daily and diet control.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Surgical History</h3>
                  <div className="space-y-3">
                    <div className="bg-card border rounded-lg p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Appendectomy</h4>
                        <span className="text-sm text-muted-foreground">2015</span>
                      </div>
                      <p className="text-sm mt-1">Laparoscopic appendectomy without complications.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Family History</h3>
                  <div className="bg-card border rounded-lg p-3">
                    <ul className="space-y-2 text-sm">
                      <li>Father: Cardiovascular disease, died at 65 from myocardial infarction</li>
                      <li>Mother: Type 2 diabetes, diagnosed at age 50</li>
                      <li>Sister: No significant medical conditions</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Social History</h3>
                  <div className="bg-card border rounded-lg p-3">
                    <ul className="space-y-2 text-sm">
                      <li>Occupation: Software engineer</li>
                      <li>Smoking: Never smoker</li>
                      <li>Alcohol: Social drinker (2-3 drinks per week)</li>
                      <li>Exercise: Sedentary lifestyle, walks occasionally</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>
                Active prescriptions and medications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-card border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Lisinopril</h4>
                      <p className="text-sm text-muted-foreground">10mg tablet</p>
                    </div>
                    <div className="bg-medical-muted px-2 py-1 rounded text-xs text-medical-primary">
                      Active
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Dosage:</span> 1 tablet daily
                    </div>
                    <div>
                      <span className="text-muted-foreground">Route:</span> Oral
                    </div>
                    <div>
                      <span className="text-muted-foreground">Started:</span> June 15, 2018
                    </div>
                    <div>
                      <span className="text-muted-foreground">Refills:</span> 2 remaining
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">For hypertension management</p>
                </div>

                <div className="bg-card border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Metformin</h4>
                      <p className="text-sm text-muted-foreground">500mg tablet</p>
                    </div>
                    <div className="bg-medical-muted px-2 py-1 rounded text-xs text-medical-primary">
                      Active
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Dosage:</span> 1 tablet twice daily
                    </div>
                    <div>
                      <span className="text-muted-foreground">Route:</span> Oral
                    </div>
                    <div>
                      <span className="text-muted-foreground">Started:</span> March 10, 2019
                    </div>
                    <div>
                      <span className="text-muted-foreground">Refills:</span> 3 remaining
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">For type 2 diabetes management</p>
                </div>

                <div className="bg-card border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Aspirin</h4>
                      <p className="text-sm text-muted-foreground">81mg tablet</p>
                    </div>
                    <div className="bg-medical-muted px-2 py-1 rounded text-xs text-medical-primary">
                      Active
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Dosage:</span> 1 tablet daily
                    </div>
                    <div>
                      <span className="text-muted-foreground">Route:</span> Oral
                    </div>
                    <div>
                      <span className="text-muted-foreground">Started:</span> January 5, 2020
                    </div>
                    <div>
                      <span className="text-muted-foreground">Refills:</span> OTC
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">For cardioprotection</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab-results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Lab Results</CardTitle>
              <CardDescription>
                Laboratory test results ordered by date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Comprehensive Metabolic Panel</h3>
                    <span className="text-sm text-muted-foreground">October 1, 2023</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-3">Test</th>
                          <th className="text-left py-2 px-3">Result</th>
                          <th className="text-left py-2 px-3">Reference Range</th>
                          <th className="text-left py-2 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2 px-3">Glucose</td>
                          <td className="py-2 px-3">142 mg/dL</td>
                          <td className="py-2 px-3">70-99 mg/dL</td>
                          <td className="py-2 px-3 text-destructive">High</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">Creatinine</td>
                          <td className="py-2 px-3">0.9 mg/dL</td>
                          <td className="py-2 px-3">0.6-1.2 mg/dL</td>
                          <td className="py-2 px-3 text-green-600">Normal</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">BUN</td>
                          <td className="py-2 px-3">18 mg/dL</td>
                          <td className="py-2 px-3">7-20 mg/dL</td>
                          <td className="py-2 px-3 text-green-600">Normal</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">eGFR</td>
                          <td className="py-2 px-3">82 mL/min</td>
                          <td className="py-2 px-3">≥60 mL/min</td>
                          <td className="py-2 px-3 text-green-600">Normal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Lipid Panel</h3>
                    <span className="text-sm text-muted-foreground">October 1, 2023</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-3">Test</th>
                          <th className="text-left py-2 px-3">Result</th>
                          <th className="text-left py-2 px-3">Reference Range</th>
                          <th className="text-left py-2 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2 px-3">Total Cholesterol</td>
                          <td className="py-2 px-3">185 mg/dL</td>
                          <td className="py-2 px-3">&lt;200 mg/dL</td>
                          <td className="py-2 px-3 text-green-600">Normal</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">LDL</td>
                          <td className="py-2 px-3">110 mg/dL</td>
                          <td className="py-2 px-3">&lt;100 mg/dL</td>
                          <td className="py-2 px-3 text-amber-600">Borderline</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">HDL</td>
                          <td className="py-2 px-3">45 mg/dL</td>
                          <td className="py-2 px-3">&gt;40 mg/dL</td>
                          <td className="py-2 px-3 text-green-600">Normal</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">Triglycerides</td>
                          <td className="py-2 px-3">150 mg/dL</td>
                          <td className="py-2 px-3">&lt;150 mg/dL</td>
                          <td className="py-2 px-3 text-green-600">Normal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Hemoglobin A1c</h3>
                    <span className="text-sm text-muted-foreground">October 1, 2023</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-3">Test</th>
                          <th className="text-left py-2 px-3">Result</th>
                          <th className="text-left py-2 px-3">Reference Range</th>
                          <th className="text-left py-2 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-3">HbA1c</td>
                          <td className="py-2 px-3">7.2%</td>
                          <td className="py-2 px-3">&lt;6.5%</td>
                          <td className="py-2 px-3 text-destructive">High</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDashboard;
